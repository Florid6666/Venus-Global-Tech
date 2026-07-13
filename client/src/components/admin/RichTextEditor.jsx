import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote } from 'ckeditor5';
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
          // No Heading plugin/toolbar button: every field this editor is used
          // for is already rendered inside a specific semantic tag by its
          // caller (h1, h3, span, ...). Letting authors pick a heading format
          // here produced invalid nested markup (e.g. <h1><h2>Title</h2></h1>)
          // and leaked the tag name into auto-generated slugs.
          plugins: [Essentials, Paragraph, Bold, Italic, Underline, Link, List, BlockQuote],
          toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote'],
        }}
        onChange={(_event, editor) => onChange(editor.getData())}
      />
    </div>
  );
};

export default RichTextEditor;
