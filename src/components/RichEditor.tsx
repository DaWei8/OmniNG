"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, Quote, Image as ImageIcon, Link as LinkIcon, List, ListOrdered, Undo, Redo } from 'lucide-react';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-700 p-2 flex flex-wrap gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-t-lg">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('bold') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('italic') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('underline') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Underline"
            >
                <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('heading', { level: 1 }) && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Heading 1"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('heading', { level: 2 }) && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Heading 2"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('heading', { level: 3 }) && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Heading 3"
            >
                <Heading3 className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('bulletList') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Bullet List"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('orderedList') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Ordered List"
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('blockquote') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Quote"
            >
                <Quote className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                type="button"
                onClick={setLink}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors", editor.isActive('link') && "bg-zinc-200 dark:bg-zinc-700 text-green-700")}
                title="Link"
            >
                <LinkIcon className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={addImage}
                className={clsx("p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors")}
                title="Image"
            >
                <ImageIcon className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-30"
                title="Undo"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-30"
                title="Redo"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
};

export default function RichEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-green-700 pl-4 italic my-8 text-zinc-600 dark:text-zinc-400',
                    },
                },
            }),
            ImageExtension.configure({
                HTMLAttributes: {
                    class: 'rounded-xl shadow-md my-6 w-full object-cover max-h-[500px]',
                },
            }),
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-green-600 hover:text-green-800 underline decoration-green-300 underline-offset-2',
                },
            }),
            UnderlineExtension,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    });

    // Sync content if it changes externally (e.g. initial load) - optional but good for reset forms
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            // Only update if content is really different to avoid cursor jumps or loops. 
            // In a simple uncontrolled usage this might update from initial value.
            // But if 'content' is updated via onChange -> setContent loop, this might be redundant or cause issues if not careful.
            // For simple forms, usually we pass initialContent.
            // But user might want to edit.

            // Simple check: if editor is empty and content provided?
            // editor.commands.setContent(content);
        }
    }, [content, editor]);


    return (
        <div className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
