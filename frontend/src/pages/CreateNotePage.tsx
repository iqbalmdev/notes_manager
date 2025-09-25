import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CreateNoteRequest } from '../types';
import { notesApi } from '../api/notesApi';
import './CreateNotePage.css';

const CreateNotePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateNoteRequest>({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Partial<CreateNoteRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setError(null);
        await notesApi.createNote(formData);
        navigate('/notes');
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Failed to create note';
        setError(errorMessage);
        console.error('Error creating note:', err);
      } finally {
        setIsSubmitting(false);
      }
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

  const handleCancel = () => {
    navigate('/notes');
  };

  return (
    <div className="create-note-page">
      <div className="page-header">
        <div className="header-content">
          <h1>✏️ Create New Note</h1>
          <p>Add a new note to your collection</p>
        </div>
        <div className="header-actions">
          <button onClick={handleCancel} className="btn btn-secondary">
            ← Back to Notes
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="note-form">
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
              rows={8}
            />
            {errors.content && <span className="error-message">{errors.content}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;
