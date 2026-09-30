import { useState } from 'react';
import Modal from './Modal';
import { useUI } from '../context/UIContext';

export default function SettingsModal({ onClose }) {
  const { apiKey, saveApiKey } = useUI();
  const [value, setValue] = useState(apiKey);

  const handleSave = () => {
    saveApiKey(value);
    onClose();
  };

  return (
    <Modal label="Settings" onClose={onClose}>
      <div className="max-w-xl p-6">
        <h2 className="text-xl font-bold">TMDB API key</h2>
        <p className="muted mt-2 text-sm">
          Paste your free key from developers.themoviedb.org (Settings, API) to switch from sample data to live
          movies and series. Leave it empty to use the sample data.
        </p>

        <label htmlFor="tmdb-key" className="mt-5 block text-sm font-medium">API key (v3)</label>
        <input
          id="tmdb-key"
          value={value}
          onChange={(event) => setValue(event.target.value.trim())}
          placeholder="e.g. 1a2b3c..."
          className="input mt-1.5"
        />

        <div className="mt-6 flex gap-3">
          <button onClick={handleSave} className="btn-primary">Save</button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
