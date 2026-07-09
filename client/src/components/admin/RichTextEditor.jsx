import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote, Heading } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

// Shared rich text field used throughout the admin panel for every editable
// text value (titles, badges, buttons, descriptions, blog bodies, etc.) so
// content is authored and stored consistently as sanitized HTML. Built on
// the self-hosted `ckeditor5` package (not the legacy "predefined build"
// packages, which are incompatible with current @ckeditor/ckeditor5-react
// versions).
const RichTextEditor = ({ value, onChange, token, placeholder }) => {
  return (
    <div className="rich-text-editor">
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        config={{
          licenseKey: 'GPL',
          placeholder,
          plugins: [Essentials, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote, Heading],
          toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', '|', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote'],
        }}
        onChange={(_event, editor) => onChange(editor.getData())}
      />
    </div>
  );
};

export default RichTextEditor;
