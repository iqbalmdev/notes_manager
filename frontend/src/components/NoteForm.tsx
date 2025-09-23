import React, { useState } from 'react';
import { CreateNoteRequest } from '../types';

interface NoteFormProps {
  onSubmit: (note: CreateNoteRequest) => void;
  isLoading?: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<CreateNoteRequest>({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Partial<CreateNoteRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateNoteRequest> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: '', content: '' });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CreateNoteRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>Add New Note</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter note title..."
          maxLength={100}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={errors.content ? 'error' : ''}
          placeholder="Enter note content..."
          rows={4}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
