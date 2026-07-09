import ReactDOM from 'react-dom/client';
import App from './App';

// Not wrapped in React.StrictMode: @ckeditor/ckeditor5-react's editor
// initialization doesn't handle StrictMode's dev-only double-invoked mount
// effects cleanly, which was causing every rich text field to render its
// toolbar but lose its initial content. StrictMode has no effect on
// production builds, so this only changes dev-mode behavior.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
