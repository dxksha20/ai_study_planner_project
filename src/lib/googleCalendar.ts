// Google Calendar Integration API Helper

export interface GoogleCalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
}

/**
 * Fetch upcoming events from Google Calendar API
 */
export async function fetchGoogleCalendarEvents(accessToken: string): Promise<GoogleCalendarEvent[]> {
  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&maxResults=10&orderBy=startTime&singleEvents=true`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Google Calendar fetch error:', err);
      throw new Error(err.error?.message || 'Failed to fetch Google Calendar events');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}

/**
 * Create a new Study Event in user's primary Google Calendar
 */
export async function createGoogleCalendarEvent(
  accessToken: string, 
  eventData: {
    title: string;
    description: string;
    startTimeIso: string;
    durationMinutes: number;
  }
): Promise<GoogleCalendarEvent> {
  try {
    const startObj = new Date(eventData.startTimeIso);
    const endObj = new Date(startObj.getTime() + eventData.durationMinutes * 60 * 1000);

    const eventPayload: GoogleCalendarEvent = {
      summary: `[Neuron Study] ${eventData.title}`,
      description: eventData.description,
      start: {
        dateTime: startObj.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: endObj.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventPayload)
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Google Calendar creation error:', err);
      throw new Error(err.error?.message || 'Failed to create Google Calendar event');
    }

    const createdEvent = await response.json();
    return createdEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}
