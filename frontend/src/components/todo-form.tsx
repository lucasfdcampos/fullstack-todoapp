'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoFormProps = {
  onAddTodo: (title: string, description: string) => Promise<void>;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = title.trim().length > 0;

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      await onAddTodo(title.trim(), description.trim());
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título da tarefa
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adicione uma tarefa..."
          disabled={isSubmitting}
          className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva os detalhes da tarefa (opcional)"
          disabled={isSubmitting}
          className="input-field min-h-[100px] resize-y dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <Plus size={18} />
            <span>Adicionar Tarefa</span>
          </>
        )}
      </button>
    </form>
  )
}
