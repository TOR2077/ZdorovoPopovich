import React, { useState, useEffect, useRef } from 'react';
import './Notes.css';

export default function Notes({ date }) {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  // Загрузка заметок из localStorage при монтировании компонента
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${date.toISOString().split('T')[0]}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [date]);

  // Закрытие редактора по клику вне
  useEffect(() => {
    if (!isEditing) return;
    function handleClickOutside(e) {
      if (editorRef.current && !editorRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem(`notes_${date.toISOString().split('T')[0]}`, notes);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="notes-block">
      {isEditing ? (
        <div className="notes-editor" ref={editorRef}>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            onKeyDown={handleKeyDown}
            placeholder="Введите ваши заметки..."
            autoFocus
          />
          <button className="notes-save-btn" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      ) : (
        <div className="notes-display" onClick={() => setIsEditing(true)}>
          {notes || 'Нажмите, чтобы добавить заметки...'}
        </div>
      )}
    </div>
  );
} 