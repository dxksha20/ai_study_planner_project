import React, { useState } from 'react';
import { UserProfile, NoteItem } from '../types';
import { BookOpenCheck, Pin, Plus, Folder, Search, Tag, Code, Stethoscope, Scale, Calculator, Sparkles, Trash2, FileText } from 'lucide-react';

interface SmartNotebookModuleProps {
  user: UserProfile;
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
}

export const SmartNotebookModule: React.FC<SmartNotebookModuleProps> = ({
  user,
  notes,
  setNotes
}) => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(notes[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCode, setNewCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveNewNote = () => {
    if (!newTitle.trim()) return;

    const note: NoteItem = {
      id: `n_${Date.now()}`,
      title: newTitle,
      stream: user.stream,
      category: user.branch || "General Studies",
      content: newContent || "Write note details here...",
      codeSnippet: newCode || undefined,
      tags: [user.stream, "UserNote"],
      updatedAt: "Just now",
      isPinned: false
    };

    setNotes([note, ...notes]);
    setSelectedNote(note);
    setNewTitle("");
    setNewContent("");
    setNewCode("");
    setIsCreating(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes.find(n => n.id !== id) || null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Stream Specific Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpenCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">
              Smart Stream Notebook
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {user.stream} Mode
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {user.stream === 'Engineering' && 'Customized with C++/Java/Python syntax highlighted code snippets & logic blocks.'}
            {user.stream === 'Medical' && 'Customized with High-yield Anatomy, Pathology & Neurovascular organ sketches.'}
            {user.stream === 'Law' && 'Customized with Constitutional Acts, Section codes & Landmark Precedents.'}
            {user.stream !== 'Engineering' && user.stream !== 'Medical' && user.stream !== 'Law' && 'Multi-stream folder organization & voice/text note support.'}
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main Grid Layout: Notes List & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Note List & Search */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, tags, or formulas..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {filteredNotes.map((note) => {
              const isSel = selectedNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => { setSelectedNote(note); setIsCreating(false); }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSel 
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md' 
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {note.category}
                    </span>
                    {note.isPinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400" />}
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{note.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{note.content}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                    <span>{note.updatedAt}</span>
                    <div className="flex gap-1">
                      {note.tags.map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editor / Note Detail / Creation */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          
          {isCreating ? (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-amber-400">Create New {user.stream} Note</h2>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Note Title (e.g. Operating Systems: Page Replacement Algorithms)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-bold focus:outline-none focus:border-amber-500"
              />
              <textarea 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your note body, bullet points, or formulas here..."
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 custom-scrollbar"
              />
              {user.stream === 'Engineering' && (
                <textarea 
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Paste Code Snippet / Algorithm Implementation..."
                  rows={4}
                  className="w-full bg-slate-950 font-mono border border-slate-800 rounded-xl p-3 text-xs text-emerald-400 focus:outline-none focus:border-amber-500 custom-scrollbar"
                />
              )}
              <div className="flex gap-2">
                <button 
                  onClick={handleSaveNewNote}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                >
                  Save Note
                </button>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : selectedNote ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {selectedNote.category}
                  </span>
                  <h2 className="text-base font-extrabold text-slate-100 mt-2">{selectedNote.title}</h2>
                </div>
                <button 
                  onClick={() => handleDeleteNote(selectedNote.id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedNote.content}
              </div>

              {selectedNote.codeSnippet && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-2 pb-1 border-b border-slate-800">
                    <span>CODE BLOCK / SYNTAX HIGHLIGHTED</span>
                    <Code className="w-3.5 h-3.5" />
                  </div>
                  <pre>{selectedNote.codeSnippet}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a note or click New Note to start writing.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
