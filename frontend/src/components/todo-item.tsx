'use client'

import type { Todo } from '@/types'
import { useState } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string, description: string) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleSave = async () => {
    if (!editTitle.trim()) return

    setIsUpdating(true)
    try {
      await onUpdate(todo.id, editTitle.trim(), editDescription.trim())
      setIsEditing(false)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await onToggle(todo.id)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(todo.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition-all duration-200 
      ${todo.completed ? "bg-gray-100 dark:bg-gray-700" : ""} 
      hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg hover:translate-y-[-2px]`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor={`edit-title-${todo.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Título
            </label>
            <input
              id={`edit-title-${todo.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título da tarefa"
              disabled={isUpdating}
              autoFocus
              className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`edit-desc-${todo.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Descrição
            </label>
            <textarea
              id={`edit-desc-${todo.id}`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição"
              className="input-field min-h-[100px] resize-y dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isUpdating}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!editTitle.trim() || isUpdating}
              className="flex items-center px-3 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={handleToggle}
                disabled={isToggling}
                className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary disabled:opacity-50"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`block text-base font-medium ${
                  todo.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {todo.title}
              </label>
              {todo.description && (
                <p
                  className={`text-sm ${
                    todo.completed
                      ? "line-through text-gray-300 dark:text-gray-600"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={isDeleting || isToggling}
              className="flex items-center justify-center rounded-md w-9 h-9 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isToggling}
              className="flex items-center justify-center rounded-md w-9 h-9 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors disabled:opacity-50"
              aria-label="Excluir"
            >
              {isDeleting ? (
                <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
