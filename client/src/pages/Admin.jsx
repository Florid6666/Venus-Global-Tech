import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import { getApiUrl } from '../config/api';
import RichTextEditor from '../components/admin/RichTextEditor';
import ImageField from '../components/admin/ImageField';
import StringArrayEditor from '../components/admin/StringArrayEditor';
import BlockBuilder from '../components/admin/BlockBuilder';
import BlockRenderer from '../components/BlockRenderer';
import { stripHtml } from '../utils/stripHtml';

// ---------------------------------------------------------------------------
// Small reusable field/array editors shared by every leaf editor below. Every
// text field uses RichTextEditor (CKEditor) so content is authored and stored
// consistently as sanitized HTML; every image field uses ImageField so admins
// can either upload a file or paste an external URL.
// ---------------------------------------------------------------------------

const Field = ({ label, value, onChange, token, full }) => (
  <div className={`field-group ${full ? 'field-full' : ''}`}>
    <label className="field-label">{label}</label>
    <RichTextEditor value={value} onChange={onChange} token={token} />
  </div>
);

// Generic editor for an array of objects, e.g. benefit cards, FAQ items,
// process steps. `fields` describes each object's shape:
// { name, label, type: 'text' | 'image' }
const ArrayEditor = ({ items, fields, onChange, addTemplate, itemLabel, token }) => {
  const list = items || [];
  const update = (index, field, value) => {
    const next = [...list];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };
  const add = () => onChange([...list, { ...addTemplate }]);
  const remove = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div>
      {list.map((item, index) => (
        <div key={index} className="array-card">
          <div className="field-grid">
            {fields.map((f) => (
              f.type === 'image' ? (
                <ImageField key={f.name} label={f.label} value={item[f.name]} onChange={(v) => update(index, f.name, v)} token={token} />
              ) : (
                <Field key={f.name} label={f.label} value={item[f.name]} onChange={(v) => update(index, f.name, v)} token={token} />
              )
            ))}
          </div>
          <button type="button" className="btn-danger-outline" onClick={() => remove(index)}>Remove {itemLabel}</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={add}>+ Add {itemLabel}</button>
    </div>
  );
};

// Keeps the page-header "Save Changes" button wired to whichever leaf editor
// is currently mounted, without every leaf needing its own save button.
const useRegisterSave = (onRegisterSave, saveFn) => {
  useEffect(() => {
    onRegisterSave(() => saveFn());
  });
};

// ---------------------------------------------------------------------------
// Section tree — drives the sidebar and the header breadcrumb. Each leaf's
// `path` is used both to look up its content slice and to build the PUT URL.
// ---------------------------------------------------------------------------

const SERVICE_LABELS = {
  agenticAI: 'Agentic AI',
  cloudService: 'Cloud Service',
  digitalReach: 'Digital Reach',
  esg: 'ESG',
  iatfAuditing: 'IATF Auditing',
  softwareDataAI: 'Software & Data AI',
};

const SERVICE_PARTS = [
  { key: 'hero', label: 'Hero' },
  { key: 'benefits', label: 'Benefits' },
  { key: 'process', label: 'Process' },
  { key: 'tools', label: 'Tools' },
  { key: 'whyChoose', label: 'Why Choose Us' },
  { key: 'faq', label: 'FAQ' },
];

const buildTree = (content) => [
  {
    key: 'home', label: 'Home Page', children: [
      { key: 'hero', label: 'Hero Section' },
      { key: 'trustedPartners', label: 'Trusted Partners' },
      { key: 'about', label: 'About Section' },
      { key: 'services', label: 'Services Section' },
      { key: 'workingProcess', label: 'Working Process' },
      { key: 'skills', label: 'Skills Marquee' },
      { key: 'cta', label: 'CTA Section' },
      { key: 'offices', label: 'Office Locations' },
    ]
  },
  {
    key: 'about', label: 'About Page', children: [
      { key: 'hero', label: 'Hero Section' },
      { key: 'stats', label: 'Stats' },
      { key: 'content', label: 'Content Section' },
    ]
  },
  {
    key: 'contact', label: 'Contact Page', children: [
      { key: 'hero', label: 'Hero Section' },
      { key: 'form', label: 'Form Section' },
      { key: 'image', label: 'Side Image' },
    ]
  },
  { key: 'navbar', label: 'Navigation' },
  { key: 'footer', label: 'Footer' },
  {
    key: 'services', label: 'Service Pages', children: Object.keys(content?.services || {}).map((sk) => ({
      key: sk, label: SERVICE_LABELS[sk] || sk, children: SERVICE_PARTS,
    }))
  },
  {
    key: 'investment', label: 'Investment Page', children: [
      { key: 'hero', label: 'Hero' },
      { key: 'stats', label: 'Stats' },
      { key: 'focus', label: 'Investment Focus' },
      { key: 'moreThanCapital', label: 'More Than Capital' },
      { key: 'gallery', label: 'Event Gallery' },
      { key: 'cta', label: 'Partner CTA' },
    ]
  },
  {
    key: 'blogsPage', label: 'Blogs Page', children: [
      { key: 'hero', label: 'Hero' },
      { key: 'categories', label: 'Category Filters' },
      { key: 'cta', label: 'Listing CTA' },
      { key: 'detailCta', label: 'Detail Page CTA' },
    ]
  },
  { key: 'blogs', label: 'Blogs' },
];

const findNode = (nodes, path, depth = 0) => {
  const node = nodes.find((n) => n.key === path[depth]);
  if (!node) return null;
  if (depth === path.length - 1) return node;
  if (!node.children) return null;
  return findNode(node.children, path, depth + 1);
};

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

const SidebarNode = ({ node, path, activePath, expanded, onToggle, onSelect }) => {
  const currentPath = [...path, node.key];
  const pathStr = currentPath.join('.');
  const isExpanded = expanded.has(pathStr);
  const isActive = activePath.join('.') === pathStr;
  const hasChildren = !!node.children;

  return (
    <li>
      <div
        className={`tree-row depth-${currentPath.length} ${isActive ? 'active' : ''}`}
        onClick={() => (hasChildren ? onToggle(pathStr) : onSelect(currentPath))}
      >
        {hasChildren && <span className={`tree-chevron ${isExpanded ? 'open' : ''}`}>▸</span>}
        <span className="tree-label">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul className="tree-children">
          {node.children.map((child) => (
            <SidebarNode
              key={child.key}
              node={child}
              path={currentPath}
              activePath={activePath}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ---------------------------------------------------------------------------
// Main Admin component
// ---------------------------------------------------------------------------

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [activePath, setActivePath] = useState(['home', 'hero']);
  const [expanded, setExpanded] = useState(new Set(['home']));
  const saveHandlerRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        alert('Server error: ' + (text || 'Invalid response from server.'));
        setLoading(false);
        return;
      }
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        loadContent();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      alert('Login error: ' + error.message + '. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    setContent(null);
    setPassword('');
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('api/content'));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      alert('Failed to load content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSubsection = async (section, subsection, data) => {
    setSaveStatus('');
    try {
      const url = subsection ? getApiUrl(`api/content/${section}/${subsection}`) : getApiUrl(`api/content/${section}`);
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        setContent((prev) => {
          const next = { ...prev };
          if (subsection) {
            next[section] = { ...next[section], [subsection]: result.content };
          } else {
            next[section] = result.content;
          }
          return next;
        });
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        const error = await response.json();
        setSaveStatus('error');
        alert(error.error || 'Failed to save');
      }
    } catch (error) {
      setSaveStatus('error');
      alert('Error saving: ' + error.message);
    }
  };

  const toggleExpand = (pathStr) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(pathStr)) next.delete(pathStr); else next.add(pathStr);
      return next;
    });
  };

  const selectLeaf = (path) => {
    setActivePath(path);
    // Auto-expand every ancestor of the selected leaf.
    setExpanded((prev) => {
      const next = new Set(prev);
      for (let i = 1; i < path.length; i++) next.add(path.slice(0, i).join('.'));
      return next;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-container">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter admin email" autoComplete="username" />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter admin password" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !content) {
    return <div className="admin-page"><div className="admin-loading">Loading content...</div></div>;
  }

  if (!content) {
    return (
      <div className="admin-page">
        <div className="admin-error">Failed to load content. Please refresh the page.</div>
      </div>
    );
  }

  const tree = buildTree(content);
  const activeNode = findNode(tree, activePath);
  const pageNode = tree.find((n) => n.key === activePath[0]);
  const isSavable = activePath[0] !== 'blogs';

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">VG</span>
          <span className="sidebar-brand-name">ADMIN PANEL</span>
        </div>
        <div className="sidebar-group-label">PAGES</div>
        <ul className="tree-root">
          {tree.map((node) => (
            <SidebarNode
              key={node.key}
              node={node}
              path={[]}
              activePath={activePath}
              expanded={expanded}
              onToggle={toggleExpand}
              onSelect={selectLeaf}
            />
          ))}
        </ul>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-titles">
            <h1>{activeNode?.label || pageNode?.label}</h1>
            <span className="topbar-subtitle">{pageNode?.label}</span>
          </div>
          <div className="topbar-actions">
            {saveStatus === 'success' && <span className="save-toast success">Saved!</span>}
            {saveStatus === 'error' && <span className="save-toast error">Save failed</span>}
            {isSavable && <span className="live-badge">LIVE</span>}
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
            {isSavable && (
              <button className="btn-save" onClick={() => saveHandlerRef.current?.()}>
                <span className="btn-save-icon">&#128190;</span> Save Changes
              </button>
            )}
          </div>
        </header>

        <div className="admin-content">
          <LeafEditor
            path={activePath}
            content={content}
            token={token}
            onSave={saveSubsection}
            onRegisterSave={(fn) => { saveHandlerRef.current = fn; }}
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Leaf dispatcher — decides which editor to render for the active path.
// ---------------------------------------------------------------------------

const LeafEditor = ({ path, content, token, onSave, onRegisterSave }) => {
  const [top, sub, part] = path;

  if (top === 'navbar') {
    return <NavbarEditor key="navbar" content={content.navbar} token={token} onSave={(data) => onSave('navbar', null, data)} onRegisterSave={onRegisterSave} />;
  }
  if (top === 'footer') {
    return <FooterEditor key="footer" content={content.footer} token={token} onSave={(data) => onSave('footer', null, data)} onRegisterSave={onRegisterSave} />;
  }
  if (top === 'blogs') {
    return <BlogEditor key="blogs" token={token} />;
  }
  if (top === 'services' && sub) {
    return (
      <ServicePartEditor
        key={sub}
        content={content.services?.[sub]}
        part={part}
        onSave={(data) => onSave('services', sub, data)}
        onRegisterSave={onRegisterSave}
        token={token}
      />
    );
  }
  if (top === 'home' && sub === 'offices') {
    return <OfficesEditor key="home-offices" items={content.home?.offices} onSave={(data) => onSave('home', 'offices', data)} onRegisterSave={onRegisterSave} token={token} />;
  }
  if (top === 'home' && sub === 'skills') {
    return <WholeStringArrayEditor key="home-skills" label="Skill" items={content.home?.skills} onSave={(data) => onSave('home', 'skills', data)} onRegisterSave={onRegisterSave} />;
  }
  if (top === 'about' && sub === 'stats') {
    return (
      <WholeObjectArrayEditor
        key="about-stats"
        items={content.about?.stats}
        fields={[
          { name: 'number', label: 'Number' },
          { name: 'description', label: 'Description' },
          { name: 'icon', label: 'Icon', type: 'image' },
        ]}
        addTemplate={{ number: '', description: '', icon: '' }}
        itemLabel="Stat"
        onSave={(data) => onSave('about', 'stats', data)}
        onRegisterSave={onRegisterSave}
        token={token}
      />
    );
  }
  if (top === 'investment' && sub === 'stats') {
    return (
      <WholeObjectArrayEditor
        key="investment-stats"
        items={content.investment?.stats}
        fields={[{ name: 'number', label: 'Number' }, { name: 'label', label: 'Label' }]}
        addTemplate={{ number: '', label: '' }}
        itemLabel="Stat"
        onSave={(data) => onSave('investment', 'stats', data)}
        onRegisterSave={onRegisterSave}
        token={token}
      />
    );
  }
  if (top === 'contact' && sub === 'image') {
    return <WholeImageEditor key="contact-image" value={content.contact?.image} onSave={(data) => onSave('contact', 'image', data)} onRegisterSave={onRegisterSave} token={token} />;
  }
  if (top === 'investment' && sub === 'focus') {
    return <InvestmentFocusEditor key="investment-focus" content={content.investment?.focus} onSave={(data) => onSave('investment', 'focus', data)} onRegisterSave={onRegisterSave} token={token} />;
  }
  if (top === 'blogsPage' && sub === 'categories') {
    return <WholeStringArrayEditor key="blogsPage-categories" label="Category" items={content.blogsPage?.categories} onSave={(data) => onSave('blogsPage', 'categories', data)} onRegisterSave={onRegisterSave} />;
  }

  // Default: simple field-driven subsection (text/image/objectArray/stringArray fields on a plain object)
  const fields = SIMPLE_FIELD_CONFIGS[`${top}.${sub}`];
  if (fields && content[top]) {
    return (
      <SimpleSubsectionEditor
        key={`${top}.${sub}`}
        value={content[top][sub]}
        fields={fields}
        onSave={(data) => onSave(top, sub, data)}
        onRegisterSave={onRegisterSave}
        token={token}
      />
    );
  }

  return <div className="empty-state">Select a section from the sidebar to start editing.</div>;
};

// ---------------------------------------------------------------------------
// Field configs for plain "object of fields" subsections
// ---------------------------------------------------------------------------

const SIMPLE_FIELD_CONFIGS = {
  'home.hero': [
    { name: 'badge', label: 'Badge Text' },
    { name: 'titleLine1', label: 'Title Line 1' },
    { name: 'titleLine2', label: 'Title Line 2' },
    { name: 'description', label: 'Description' },
    { name: 'ctaButton', label: 'CTA Button Text' },
    { name: 'image', label: 'Hero Image', kind: 'image' },
    { name: 'trailImages', label: 'Mouse-Trail Images', kind: 'stringArray', itemLabel: 'Image Path' },
    { name: 'backgroundWords', label: 'Scrolling Background Words', kind: 'stringArray', itemLabel: 'Word' },
  ],
  'home.trustedPartners': [
    { name: 'badge', label: 'Badge' },
    { name: 'companies', label: 'Companies', kind: 'stringArray', itemLabel: 'Company' },
  ],
  'home.about': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'image', label: 'Image', kind: 'image' },
    { name: 'moreAboutButton', label: 'More About Button' },
    { name: 'getQuoteText', label: 'Get Quote Text' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'whatsappLink', label: 'WhatsApp Link' },
    {
      name: 'stats', label: 'Stats', kind: 'objectArray', itemLabel: 'Stat',
      itemFields: [{ name: 'number', label: 'Number' }, { name: 'description', label: 'Description' }, { name: 'icon', label: 'Icon', type: 'image' }],
      addTemplate: { number: '', description: '', icon: '' },
    },
  ],
  'home.services': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    {
      name: 'items', label: 'Service Items', kind: 'objectArray', itemLabel: 'Service',
      itemFields: [
        { name: 'number', label: 'Number' }, { name: 'title', label: 'Title' }, { name: 'description', label: 'Description' },
        { name: 'link', label: 'Link' }, { name: 'image', label: 'Image', type: 'image' },
      ],
      addTemplate: { number: '', title: '', description: '', link: '', image: '' },
    },
  ],
  'home.workingProcess': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'startProjectsButton', label: 'Start Projects Button' },
    {
      name: 'steps', label: 'Steps', kind: 'objectArray', itemLabel: 'Step',
      itemFields: [{ name: 'number', label: 'Number' }, { name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }, { name: 'icon', label: 'Icon', type: 'image' }],
      addTemplate: { number: '', title: '', description: '', icon: '' },
    },
  ],
  'home.cta': [
    { name: 'prompt', label: 'Prompt' },
    { name: 'title', label: 'Title' },
    { name: 'button', label: 'Button Text' },
    { name: 'whatsappLink', label: 'WhatsApp Link' },
    { name: 'backgroundImage', label: 'Background Image', kind: 'image' },
  ],
  'about.hero': [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'servicesButton', label: 'Services Button' },
    { name: 'consultationButton', label: 'Consultation Button' },
    { name: 'consultationLink', label: 'Consultation Link' },
  ],
  'about.content': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'image', label: 'Image', kind: 'image' },
    { name: 'startProjectsButton', label: 'Start Projects Button' },
    {
      name: 'features', label: 'Features', kind: 'objectArray', itemLabel: 'Feature',
      itemFields: [{ name: 'title', label: 'Feature Title' }, { name: 'description', label: 'Feature Description' }],
      addTemplate: { title: '', description: '' },
    },
  ],
  'contact.hero': [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
  ],
  'contact.form': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'nameLabel', label: 'Name Label' },
    { name: 'namePlaceholder', label: 'Name Placeholder' },
    { name: 'emailLabel', label: 'Email Label' },
    { name: 'emailPlaceholder', label: 'Email Placeholder' },
    { name: 'phoneLabel', label: 'Phone Label' },
    { name: 'phonePlaceholder', label: 'Phone Placeholder' },
    { name: 'budgetLabel', label: 'Budget Label' },
    { name: 'budgetPlaceholder', label: 'Budget Placeholder' },
    { name: 'inquiryLabel', label: 'Inquiry Label' },
    { name: 'inquiryPlaceholder', label: 'Inquiry Placeholder' },
    { name: 'submitButton', label: 'Submit Button' },
    { name: 'submittingButton', label: 'Submitting Button' },
    { name: 'successMessage', label: 'Success Message' },
    { name: 'errorMessage', label: 'Error Message' },
  ],
  'investment.hero': [
    { name: 'badge', label: 'Badge' },
    { name: 'badgeIcon', label: 'Badge Icon Class' },
    { name: 'titleLine1', label: 'Title Line 1' },
    { name: 'titleAccent', label: 'Title Accent' },
    { name: 'subtitle', label: 'Subtitle' },
    { name: 'description', label: 'Description' },
    { name: 'primaryButton', label: 'Primary Button' },
    { name: 'secondaryButton', label: 'Secondary Button' },
    { name: 'backgroundImage', label: 'Background Image', kind: 'image' },
  ],
  'investment.moreThanCapital': [
    { name: 'badge', label: 'Badge' },
    { name: 'titleLine1', label: 'Title Line 1' },
    { name: 'titleLine2', label: 'Title Line 2' },
    { name: 'description', label: 'Description' },
    { name: 'mainImage', label: 'Main Image', kind: 'image' },
    { name: 'secondaryImage', label: 'Secondary Image', kind: 'image' },
    {
      name: 'pillars', label: 'Pillars', kind: 'objectArray', itemLabel: 'Pillar',
      itemFields: [{ name: 'icon', label: 'Icon Class' }, { name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }],
      addTemplate: { icon: '', title: '', description: '' },
    },
  ],
  'investment.gallery': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    {
      name: 'items', label: 'Gallery Items', kind: 'objectArray', itemLabel: 'Item',
      itemFields: [{ name: 'image', label: 'Image', type: 'image' }, { name: 'caption', label: 'Caption' }],
      addTemplate: { image: '', caption: '', size: 'regular' },
    },
  ],
  'investment.cta': [
    { name: 'badge', label: 'Badge' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'subNote', label: 'Sub Note' },
    { name: 'buttonText', label: 'Button Text' },
    { name: 'note', label: 'Note' },
  ],
  'blogsPage.hero': [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
  ],
  'blogsPage.cta': [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'primaryButton', label: 'Primary Button' },
    { name: 'secondaryButton', label: 'Secondary Button' },
    { name: 'whatsappLink', label: 'WhatsApp Link' },
  ],
  'blogsPage.detailCta': [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'primaryButton', label: 'Primary Button' },
    { name: 'secondaryButton', label: 'Secondary Button' },
    { name: 'whatsappLink', label: 'WhatsApp Link' },
  ],
};

const renderSimpleField = (f, local, set, token) => {
  if (f.kind === 'image') return <ImageField key={f.name} label={f.label} value={local[f.name]} onChange={(v) => set(f.name, v)} token={token} />;
  if (f.kind === 'stringArray') {
    return (
      <div key={f.name} className="field-group field-full">
        <label className="field-label">{f.label}</label>
        <StringArrayEditor items={local[f.name]} onChange={(v) => set(f.name, v)} label={f.itemLabel || f.label} />
      </div>
    );
  }
  if (f.kind === 'objectArray') {
    return (
      <div key={f.name} className="field-group field-full">
        <label className="field-label">{f.label}</label>
        <ArrayEditor items={local[f.name]} fields={f.itemFields} addTemplate={f.addTemplate} itemLabel={f.itemLabel} token={token} onChange={(v) => set(f.name, v)} />
      </div>
    );
  }
  return <Field key={f.name} label={f.label} value={local[f.name]} onChange={(v) => set(f.name, v)} token={token} />;
};

const SimpleSubsectionEditor = ({ value, fields, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(value || {});
  useEffect(() => setLocal(value || {}), [value]);
  const set = (name, v) => setLocal((prev) => ({ ...prev, [name]: v }));
  useRegisterSave(onRegisterSave, () => onSave(local));

  if (fields.length === 0) {
    return <div className="empty-state">This section has no simple fields configured yet.</div>;
  }

  return <div className="field-grid">{fields.map((f) => renderSimpleField(f, local, set, token))}</div>;
};

// ---------------------------------------------------------------------------
// Whole-value editors (the subsection value itself is a string / string[] /
// object[], not an object with named fields)
// ---------------------------------------------------------------------------

const WholeStringArrayEditor = ({ items, label, onSave, onRegisterSave }) => {
  const [local, setLocal] = useState(items || []);
  useEffect(() => setLocal(items || []), [items]);
  useRegisterSave(onRegisterSave, () => onSave(local));
  return <StringArrayEditor items={local} onChange={setLocal} label={label} />;
};

const WholeObjectArrayEditor = ({ items, fields, addTemplate, itemLabel, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(items || []);
  useEffect(() => setLocal(items || []), [items]);
  useRegisterSave(onRegisterSave, () => onSave(local));
  return <ArrayEditor items={local} fields={fields} addTemplate={addTemplate} itemLabel={itemLabel} token={token} onChange={setLocal} />;
};

const WholeImageEditor = ({ value, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(value || '');
  useEffect(() => setLocal(value || ''), [value]);
  useRegisterSave(onRegisterSave, () => onSave(local));
  return <ImageField label="Image" value={local} onChange={setLocal} token={token} />;
};

// ---------------------------------------------------------------------------
// Offices (Home page) — nested phones array per office
// ---------------------------------------------------------------------------

const OfficesEditor = ({ items, onSave, onRegisterSave, token }) => {
  const [offices, setOffices] = useState(items || []);
  useEffect(() => setOffices(items || []), [items]);
  useRegisterSave(onRegisterSave, () => onSave(offices));

  const updateOffice = (index, field, value) => {
    const next = [...offices]; next[index] = { ...next[index], [field]: value }; setOffices(next);
  };

  return (
    <div>
      {offices.map((office, index) => (
        <div key={index} className="array-card">
          <div className="field-grid">
            <Field label="City" value={office.city} onChange={(v) => updateOffice(index, 'city', v)} token={token} />
            <Field label="Country" value={office.country} onChange={(v) => updateOffice(index, 'country', v)} token={token} />
            <ImageField label="Flag Image URL" value={office.flag} onChange={(v) => updateOffice(index, 'flag', v)} token={token} />
            <Field label="Address" value={office.address} onChange={(v) => updateOffice(index, 'address', v)} token={token} />
          </div>
          <h5>Phone Numbers</h5>
          {office.phones?.map((phone, phoneIndex) => (
            <div key={phoneIndex} className="array-row">
              <input type="text" placeholder="Phone Number" value={phone.number || ''} onChange={(e) => {
                const next = [...offices]; next[index].phones[phoneIndex] = { ...next[index].phones[phoneIndex], number: e.target.value }; setOffices(next);
              }} />
              <input type="text" placeholder="WhatsApp Link" value={phone.whatsapp || ''} onChange={(e) => {
                const next = [...offices]; next[index].phones[phoneIndex] = { ...next[index].phones[phoneIndex], whatsapp: e.target.value }; setOffices(next);
              }} />
              <button type="button" className="btn-danger-outline" onClick={() => {
                const next = [...offices]; next[index].phones = next[index].phones.filter((_, i) => i !== phoneIndex); setOffices(next);
              }}>Remove</button>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={() => {
            const next = [...offices]; next[index].phones = [...(next[index].phones || []), { number: '', whatsapp: '' }]; setOffices(next);
          }}>+ Add Phone</button>
          <button type="button" className="btn-danger-outline" style={{ display: 'block', marginTop: '0.75rem' }} onClick={() => setOffices(offices.filter((_, i) => i !== index))}>Remove Office</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => setOffices([...offices, { country: '', city: '', flag: '', address: '', phones: [] }])}>+ Add Office</button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Investment Focus — badge/title/description + sectors keyed object
// ---------------------------------------------------------------------------

const SECTOR_LABELS = { food: 'Food Technology', pharma: 'Pharmaceutical & Healthcare', industry: 'Industry 4.0' };

const InvestmentFocusEditor = ({ content, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(content || {});
  useEffect(() => setLocal(content || {}), [content]);
  useRegisterSave(onRegisterSave, () => onSave(local));

  const set = (field, value) => setLocal((prev) => ({ ...prev, [field]: value }));
  const updateSector = (key, field, value) => {
    setLocal((prev) => ({ ...prev, sectors: { ...prev.sectors, [key]: { ...prev.sectors[key], [field]: value } } }));
  };

  return (
    <div>
      <div className="field-grid">
        <Field label="Badge" value={local.badge} onChange={(v) => set('badge', v)} token={token} />
        <Field label="Title" value={local.title} onChange={(v) => set('title', v)} token={token} />
        <Field label="Description" value={local.description} onChange={(v) => set('description', v)} token={token} full />
      </div>
      {Object.keys(local.sectors || {}).map((key) => (
        <div key={key} className="array-card">
          <h4>{SECTOR_LABELS[key] || key}</h4>
          <div className="field-grid">
            <Field label="Label" value={local.sectors[key].label} onChange={(v) => updateSector(key, 'label', v)} token={token} />
            <Field label="Icon Class" value={local.sectors[key].icon} onChange={(v) => updateSector(key, 'icon', v)} token={token} />
            <ImageField label="Image" value={local.sectors[key].image} onChange={(v) => updateSector(key, 'image', v)} token={token} />
            <Field label="Color (hex)" value={local.sectors[key].color} onChange={(v) => updateSector(key, 'color', v)} token={token} />
          </div>
          <label className="field-label">Focus Areas</label>
          <StringArrayEditor label="Item" items={local.sectors[key].items} onChange={(v) => updateSector(key, 'items', v)} />
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Service part editor — full service object kept in state so switching
// between Hero/Benefits/Process/etc. within the same service doesn't lose
// unsaved edits; Save always PUTs the whole services.<key> object.
// ---------------------------------------------------------------------------

const ServicePartEditor = ({ content, part, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(content || {});
  useEffect(() => setLocal(content || {}), [content]);
  useRegisterSave(onRegisterSave, () => onSave(local));

  const set = (section, field, value) => setLocal((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  if (part === 'hero') {
    const hero = local.hero || {};
    return (
      <div className="field-grid">
        <Field label="Badge" value={hero.badge} onChange={(v) => set('hero', 'badge', v)} token={token} />
        <Field label="Title Line 1" value={hero.titleLine1} onChange={(v) => set('hero', 'titleLine1', v)} token={token} />
        <Field label="Title Line 2" value={hero.titleLine2} onChange={(v) => set('hero', 'titleLine2', v)} token={token} />
        <Field label="CTA Button" value={hero.ctaButton} onChange={(v) => set('hero', 'ctaButton', v)} token={token} />
        <Field label="Description" value={hero.description} onChange={(v) => set('hero', 'description', v)} token={token} full />
        <Field label="Lottie Animation Path (leave empty to use a static image instead)" value={hero.lottiePath} onChange={(v) => set('hero', 'lottiePath', v)} token={token} />
        <Field label="Fallback Icon Class (e.g. fa-robot)" value={hero.fallbackIcon} onChange={(v) => set('hero', 'fallbackIcon', v)} token={token} />
        <ImageField label="Static Hero Image (used only if no Lottie path)" value={hero.image} onChange={(v) => set('hero', 'image', v)} token={token} />
      </div>
    );
  }
  if (part === 'benefits') {
    const benefits = local.benefits || {};
    return (
      <div className="field-grid">
        <Field label="Badge" value={benefits.badge} onChange={(v) => set('benefits', 'badge', v)} token={token} />
        <Field label="Title" value={benefits.title} onChange={(v) => set('benefits', 'title', v)} token={token} />
        <Field label="Description" value={benefits.description} onChange={(v) => set('benefits', 'description', v)} token={token} full />
        <div className="field-group field-full">
          <label className="field-label">Benefit Cards</label>
          <ArrayEditor
            items={benefits.items}
            fields={[{ name: 'icon', label: 'Icon Class (e.g. fa-rocket)' }, { name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }]}
            addTemplate={{ icon: '', title: '', description: '' }}
            itemLabel="Benefit"
            token={token}
            onChange={(v) => set('benefits', 'items', v)}
          />
        </div>
      </div>
    );
  }
  if (part === 'process') {
    const process = local.process || {};
    return (
      <div className="field-grid">
        <Field label="Badge" value={process.badge} onChange={(v) => set('process', 'badge', v)} token={token} />
        <Field label="Title" value={process.title} onChange={(v) => set('process', 'title', v)} token={token} />
        <Field label="Description" value={process.description} onChange={(v) => set('process', 'description', v)} token={token} full />
        <div className="field-group field-full">
          <label className="field-label">Steps</label>
          <ArrayEditor
            items={process.steps}
            fields={[{ name: 'number', label: 'Number' }, { name: 'icon', label: 'Icon Class' }, { name: 'title', label: 'Title' }]}
            addTemplate={{ number: '', icon: '', title: '' }}
            itemLabel="Step"
            token={token}
            onChange={(v) => set('process', 'steps', v)}
          />
        </div>
      </div>
    );
  }
  if (part === 'tools') {
    const tools = local.tools || {};
    return (
      <div className="field-grid">
        <Field label="Badge" value={tools.badge} onChange={(v) => set('tools', 'badge', v)} token={token} />
        <Field label="Title" value={tools.title} onChange={(v) => set('tools', 'title', v)} token={token} />
        <Field label="Description" value={tools.description} onChange={(v) => set('tools', 'description', v)} token={token} full />
        <div className="field-group field-full">
          <label className="field-label">Tools</label>
          <ArrayEditor
            items={tools.items}
            fields={[{ name: 'icon', label: 'Icon Class' }, { name: 'name', label: 'Name' }]}
            addTemplate={{ icon: '', name: '' }}
            itemLabel="Tool"
            token={token}
            onChange={(v) => set('tools', 'items', v)}
          />
        </div>
      </div>
    );
  }
  if (part === 'whyChoose') {
    const whyChoose = local.whyChoose || {};
    return (
      <div className="field-grid">
        <Field label="Badge (optional)" value={whyChoose.badge} onChange={(v) => set('whyChoose', 'badge', v)} token={token} />
        <Field label="Title (optional)" value={whyChoose.title} onChange={(v) => set('whyChoose', 'title', v)} token={token} />
        <Field label="Description (optional)" value={whyChoose.description} onChange={(v) => set('whyChoose', 'description', v)} token={token} full />
        <ImageField label="Image" value={whyChoose.image} onChange={(v) => set('whyChoose', 'image', v)} token={token} />
        <div className="field-group field-full">
          <label className="field-label">Reasons</label>
          <ArrayEditor
            items={whyChoose.items}
            fields={[{ name: 'icon', label: 'Icon Class' }, { name: 'title', label: 'Title' }, { name: 'description', label: 'Description' }]}
            addTemplate={{ icon: 'fa-check', title: '', description: '' }}
            itemLabel="Reason"
            token={token}
            onChange={(v) => set('whyChoose', 'items', v)}
          />
        </div>
      </div>
    );
  }
  if (part === 'faq') {
    const faq = local.faq || {};
    const setContactCard = (field, value) => setLocal((prev) => ({ ...prev, faq: { ...prev.faq, contactCard: { ...prev.faq?.contactCard, [field]: value } } }));
    return (
      <div className="field-grid">
        <Field label="Badge" value={faq.badge} onChange={(v) => set('faq', 'badge', v)} token={token} />
        <Field label="Title" value={faq.title} onChange={(v) => set('faq', 'title', v)} token={token} />
        <Field label="Description (optional)" value={faq.description} onChange={(v) => set('faq', 'description', v)} token={token} full />
        <div className="field-group field-full">
          <label className="field-label">Questions</label>
          <ArrayEditor
            items={faq.items}
            fields={[{ name: 'question', label: 'Question' }, { name: 'answer', label: 'Answer' }]}
            addTemplate={{ question: '', answer: '' }}
            itemLabel="FAQ"
            token={token}
            onChange={(v) => set('faq', 'items', v)}
          />
        </div>
        <Field label="Contact Card Title" value={faq.contactCard?.title} onChange={(v) => setContactCard('title', v)} token={token} />
        <Field label="Contact Card Button Text" value={faq.contactCard?.buttonText} onChange={(v) => setContactCard('buttonText', v)} token={token} />
        <Field label="Contact Card Description" value={faq.contactCard?.description} onChange={(v) => setContactCard('description', v)} token={token} full />
      </div>
    );
  }

  return <div className="empty-state">Select a part of this service page from the sidebar.</div>;
};

// ---------------------------------------------------------------------------
// Navbar (whole object, single save)
// ---------------------------------------------------------------------------

const NavbarEditor = ({ content, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(content);
  useEffect(() => setLocal(content), [content]);
  useRegisterSave(onRegisterSave, () => onSave(local));

  const set = (field, value) => setLocal((prev) => ({ ...prev, [field]: value }));

  const updateMenuItem = (index, field, value) => {
    const next = [...local.menuItems]; next[index] = { ...next[index], [field]: value }; setLocal({ ...local, menuItems: next });
  };
  const updateSubItem = (index, subIndex, field, value) => {
    const next = [...local.menuItems];
    const submenu = [...(next[index].submenu || [])];
    submenu[subIndex] = { ...submenu[subIndex], [field]: value };
    next[index] = { ...next[index], submenu };
    setLocal({ ...local, menuItems: next });
  };

  return (
    <div>
      <div className="field-grid">
        <ImageField label="Logo Image" value={local.logo} onChange={(v) => set('logo', v)} token={token} />
        <Field label="Logo Alt Text" value={local.logoAlt} onChange={(v) => set('logoAlt', v)} token={token} />
        <Field label="Call Text" value={local.callText} onChange={(v) => set('callText', v)} token={token} />
        <Field label="Phone Number" value={local.phoneNumber} onChange={(v) => set('phoneNumber', v)} token={token} />
        <Field label="WhatsApp Link" value={local.whatsappLink} onChange={(v) => set('whatsappLink', v)} token={token} full />
      </div>

      <h3>Menu Items</h3>
      {local.menuItems?.map((item, index) => (
        <div key={index} className="array-card">
          <div className="field-grid">
            <Field label="Label" value={item.label} onChange={(v) => updateMenuItem(index, 'label', v)} token={token} />
            <Field label="Path" value={item.path} onChange={(v) => updateMenuItem(index, 'path', v)} token={token} />
          </div>
          {item.submenu && (
            <>
              <h5>Submenu</h5>
              {item.submenu.map((sub, subIndex) => (
                <div key={subIndex} className="array-row">
                  <input type="text" placeholder="Label" value={sub.label} onChange={(e) => updateSubItem(index, subIndex, 'label', e.target.value)} />
                  <input type="text" placeholder="Path" value={sub.path} onChange={(e) => updateSubItem(index, subIndex, 'path', e.target.value)} />
                  <button type="button" className="btn-danger-outline" onClick={() => {
                    const next = [...local.menuItems];
                    next[index] = { ...next[index], submenu: next[index].submenu.filter((_, i) => i !== subIndex) };
                    setLocal({ ...local, menuItems: next });
                  }}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => {
                const next = [...local.menuItems];
                next[index] = { ...next[index], submenu: [...(next[index].submenu || []), { label: '', path: '' }] };
                setLocal({ ...local, menuItems: next });
              }}>+ Add Submenu Item</button>
            </>
          )}
          <button type="button" className="btn-danger-outline" style={{ display: 'block', marginTop: '0.75rem' }} onClick={() => setLocal({ ...local, menuItems: local.menuItems.filter((_, i) => i !== index) })}>Remove Menu Item</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={() => setLocal({ ...local, menuItems: [...(local.menuItems || []), { label: '', path: '' }] })}>+ Add Menu Item</button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Footer (whole object, single save)
// ---------------------------------------------------------------------------

const FooterEditor = ({ content, onSave, onRegisterSave, token }) => {
  const [local, setLocal] = useState(content);
  useEffect(() => setLocal(content), [content]);
  useRegisterSave(onRegisterSave, () => onSave(local));

  const set = (section, field, value) => setLocal((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  return (
    <div>
      <h3>Brand</h3>
      <div className="field-grid">
        <Field label="Brand Name" value={local.brand?.name} onChange={(v) => set('brand', 'name', v)} token={token} />
        <Field label="Description" value={local.brand?.description} onChange={(v) => set('brand', 'description', v)} token={token} full />
      </div>
      <label className="field-label">Social Links</label>
      <ArrayEditor
        items={local.brand?.socialLinks}
        fields={[{ name: 'platform', label: 'Platform' }, { name: 'url', label: 'URL' }, { name: 'icon', label: 'Icon Class (e.g. fab fa-facebook-f)' }]}
        addTemplate={{ platform: '', url: '', icon: '' }}
        itemLabel="Social Link"
        token={token}
        onChange={(v) => set('brand', 'socialLinks', v)}
      />

      <h3>Quick Links</h3>
      <Field label="Section Title" value={local.quickLinks?.title} onChange={(v) => set('quickLinks', 'title', v)} token={token} />
      <ArrayEditor
        items={local.quickLinks?.links}
        fields={[{ name: 'label', label: 'Label' }, { name: 'url', label: 'URL' }]}
        addTemplate={{ label: '', url: '' }}
        itemLabel="Link"
        token={token}
        onChange={(v) => set('quickLinks', 'links', v)}
      />

      <h3>Services Links</h3>
      <Field label="Section Title" value={local.services?.title} onChange={(v) => set('services', 'title', v)} token={token} />
      <ArrayEditor
        items={local.services?.links}
        fields={[{ name: 'label', label: 'Label' }, { name: 'url', label: 'URL' }]}
        addTemplate={{ label: '', url: '' }}
        itemLabel="Link"
        token={token}
        onChange={(v) => set('services', 'links', v)}
      />

      <h3>Contact Info</h3>
      <div className="field-grid">
        <Field label="Section Title" value={local.contact?.title} onChange={(v) => set('contact', 'title', v)} token={token} />
        <Field label="Address" value={local.contact?.address} onChange={(v) => set('contact', 'address', v)} token={token} />
        <Field label="Phone" value={local.contact?.phone} onChange={(v) => set('contact', 'phone', v)} token={token} />
        <Field label="Phone WhatsApp Link" value={local.contact?.phoneWhatsapp} onChange={(v) => set('contact', 'phoneWhatsapp', v)} token={token} />
        <Field label="Email" value={local.contact?.email} onChange={(v) => set('contact', 'email', v)} token={token} />
      </div>

      <h3>Copyright &amp; Bottom Links</h3>
      <Field label="Copyright Text" value={local.copyright} onChange={(v) => setLocal((prev) => ({ ...prev, copyright: v }))} token={token} />
      <ArrayEditor
        items={local.bottomLinks}
        fields={[{ name: 'label', label: 'Label' }, { name: 'url', label: 'URL' }]}
        addTemplate={{ label: '', url: '' }}
        itemLabel="Link"
        token={token}
        onChange={(v) => setLocal((prev) => ({ ...prev, bottomLinks: v }))}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Blog Editor (individual posts) — its own CRUD UI, not a simple field form
// ---------------------------------------------------------------------------

const BlogEditor = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', excerpt: '', contentBlocks: [], author: 'Venus Tech Team', category: 'AI & Technology',
    image: '', featured: false, slug: '', date: new Date().toISOString().split('T')[0],
    metaTitle: '', metaDescription: '', faq: [],
  });
  const [saveStatus, setSaveStatus] = useState('');

  const categories = ['AI & Technology', 'ESG', 'Digital Strategy', 'Cloud Services', 'Software Development'];

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('api/blogs'));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setBlogs(await response.json());
    } catch (error) {
      alert('Failed to load blogs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !editingBlog) {
      const slug = stripHtml(value).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '', subtitle: '', excerpt: '', contentBlocks: [], author: 'Venus Tech Team', category: 'AI & Technology',
      image: '', featured: false, slug: '', date: new Date().toISOString().split('T')[0],
      metaTitle: '', metaDescription: '', faq: [],
    });
    setShowForm(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    // Posts written before the block builder existed only have `content`
    // (a single HTML blob) — seed it as one read-only "legacy" block so
    // nothing is lost; it can be deleted once recreated as real blocks.
    const contentBlocks = blog.contentBlocks && blog.contentBlocks.length > 0
      ? blog.contentBlocks
      : (blog.content ? [{ type: 'legacy', html: blog.content }] : []);
    setFormData({
      title: blog.title || '', subtitle: blog.subtitle || '', excerpt: blog.excerpt || '', contentBlocks, author: blog.author || 'Venus Tech Team',
      category: blog.category || 'AI & Technology', image: blog.image || '', featured: blog.featured || false, slug: blog.slug || '',
      date: blog.date || new Date().toISOString().split('T')[0],
      metaTitle: blog.metaTitle || '', metaDescription: blog.metaDescription || '', faq: blog.faq || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setLoading(true);
    try {
      const response = await fetch(getApiUrl(`api/blogs/${blogId}`), { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setSaveStatus('success'); setTimeout(() => setSaveStatus(''), 3000); loadBlogs(); }
      else { const error = await response.json(); alert(error.error || 'Failed to delete blog'); }
    } catch (error) {
      alert('Error deleting blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contentBlocks || formData.contentBlocks.length === 0) {
      alert('Add at least one content block before saving.');
      return;
    }
    setLoading(true);
    try {
      const url = editingBlog ? getApiUrl(`api/blogs/${editingBlog.id}`) : getApiUrl('api/blogs');
      const method = editingBlog ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(formData) });
      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => { setSaveStatus(''); setShowForm(false); setEditingBlog(null); }, 1500);
        loadBlogs();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save blog');
      }
    } catch (error) {
      alert('Error saving blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="blog-toolbar">
        {showForm ? (
          <button type="button" onClick={() => { setShowForm(false); setEditingBlog(null); }} className="btn-logout">&larr; Back to Blogs</button>
        ) : (
          <button onClick={handleCreate} className="btn-save">+ Add New Blog</button>
        )}
        {saveStatus === 'success' && <span className="save-toast success">Saved!</span>}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Field label="Title *" value={formData.title} onChange={(v) => handleInputChange('title', v)} token={token} full />
          <Field label="Subtitle" value={formData.subtitle} onChange={(v) => handleInputChange('subtitle', v)} token={token} full />
          <Field label="Excerpt" value={formData.excerpt} onChange={(v) => handleInputChange('excerpt', v)} token={token} full />

          <h3>SEO</h3>
          <div className="field-grid">
            <div className="field-group">
              <label className="field-label">Meta Title</label>
              <input type="text" value={formData.metaTitle} onChange={(e) => handleInputChange('metaTitle', e.target.value)} placeholder="Defaults to Title if left blank" maxLength={70} />
            </div>
            <div className="field-group field-full">
              <label className="field-label">Meta Description</label>
              <textarea rows={2} value={formData.metaDescription} onChange={(e) => handleInputChange('metaDescription', e.target.value)} placeholder="Defaults to Excerpt if left blank" maxLength={200} />
            </div>
          </div>

          <div className="field-group field-full">
            <label className="field-label">Content Blocks *</label>
            <BlockBuilder
              blocks={formData.contentBlocks}
              onChange={(v) => setFormData((prev) => ({ ...prev, contentBlocks: v }))}
              token={token}
            />
          </div>

          <div className="field-group field-full">
            <label className="field-label">Live Preview</label>
            <div className="blog-live-preview">
              <BlockRenderer blocks={formData.contentBlocks} />
            </div>
          </div>

          <h3>FAQ</h3>
          <div className="field-group field-full">
            <ArrayEditor
              items={formData.faq}
              fields={[{ name: 'question', label: 'Question' }, { name: 'answer', label: 'Answer' }]}
              addTemplate={{ question: '', answer: '' }}
              itemLabel="FAQ"
              token={token}
              onChange={(v) => setFormData((prev) => ({ ...prev, faq: v }))}
            />
          </div>

          <div className="field-grid">
            <Field label="Author" value={formData.author} onChange={(v) => handleInputChange('author', v)} token={token} />
            <div className="field-group">
              <label className="field-label">Category</label>
              <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <ImageField label="Image" value={formData.image} onChange={(v) => handleInputChange('image', v)} token={token} />
            <div className="field-group">
              <label className="field-label">Date</label>
              <input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => handleInputChange('slug', e.target.value)} placeholder="auto-generated-from-title" />
            </div>
            <div className="field-group">
              <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={formData.featured} onChange={(e) => handleInputChange('featured', e.target.checked)} />
                Featured Blog
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-save" disabled={loading}>{loading ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingBlog(null); }} className="btn-logout">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="blogs-table-wrap">
          {loading && blogs.length === 0 ? (
            <div className="empty-state">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="empty-state">No blogs found. Create your first blog!</div>
          ) : (
            <table className="blogs-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Date</th><th>Featured</th><th></th></tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <strong>{stripHtml(blog.title)}</strong>
                      {blog.excerpt && <div className="blog-row-excerpt">{stripHtml(blog.excerpt).substring(0, 60)}...</div>}
                    </td>
                    <td>{blog.category}</td>
                    <td>{blog.date}</td>
                    <td>{blog.featured ? <span className="featured-tag">★ Featured</span> : <span className="muted">—</span>}</td>
                    <td className="blog-row-actions">
                      <button onClick={() => handleEdit(blog)} className="btn-add">Edit</button>
                      <button onClick={() => handleDelete(blog.id)} className="btn-danger-outline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
