import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { Edit3 } from 'lucide-react';

interface EditableTextProps {
  textKey: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  textKey,
  defaultText,
  className = '',
  as: Component = 'p',
  multiline = false
}) => {
  const { customization, updateText, isAdminMode } = useAdmin();
  const { hasPermission, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const currentText = customization.texts[textKey] || defaultText;

  const handleEdit = () => {
    if (!isAuthenticated || !hasPermission('write')) return;
    setTempValue(currentText);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateText(textKey, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} border-2 border-blue-500 rounded p-2 resize-vertical`}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} border-2 border-blue-500 rounded p-2`}
            autoFocus
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <Component className={className}>
        {currentText}
      </Component>
      {isAuthenticated && isAdminMode && hasPermission('write') && (
        <button
          onClick={handleEdit}
          className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          title="Modifier ce texte"
        >
          <Edit3 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default EditableText;