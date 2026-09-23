import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image, Heading1, Heading2, Heading3, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Commencez à écrire...',
  minHeight = '200px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isFocused && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value, isFocused]);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Entrez l\'URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Gras (Ctrl+B)' },
    { icon: Italic, command: 'italic', title: 'Italique (Ctrl+I)' },
    { icon: Heading1, command: 'formatBlock', value: '<h1>', title: 'Titre 1' },
    { icon: Heading2, command: 'formatBlock', value: '<h2>', title: 'Titre 2' },
    { icon: Heading3, command: 'formatBlock', value: '<h3>', title: 'Titre 3' },
    { icon: List, command: 'insertUnorderedList', title: 'Liste à puces' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Liste numérotée' },
    { icon: LinkIcon, command: 'link', title: 'Insérer un lien', custom: true },
    { icon: Undo, command: 'undo', title: 'Annuler' },
    { icon: Redo, command: 'redo', title: 'Rétablir' },
  ];

  return (
    <div className={`border rounded-lg overflow-hidden transition-all ${isFocused ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-300'}`}>
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              if (button.command === 'link') {
                insertLink();
              } else {
                executeCommand(button.command, button.value);
              }
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title={button.title}
          >
            <button.icon className="w-4 h-4 text-gray-700" />
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-4 outline-none prose prose-sm max-w-none"
        style={{ minHeight }}
        dir="ltr"
        data-placeholder={placeholder}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }

        [contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        [contenteditable] h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        [contenteditable] ul, [contenteditable] ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }

        [contenteditable] a {
          color: #2563EB;
          text-decoration: underline;
        }

        [contenteditable] p {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
