import DetailsModal from './DetailsModal';
import PlayerModal from './PlayerModal';
import SettingsModal from './SettingsModal';
import Toast from './Toast';
import { useUI } from '../context/UIContext';

// Renders whichever modal is open. Lives once inside Layout so every page can open them.
export default function ModalHost() {
  const { selected, closeDetails, playing, closePlayer, settingsOpen, closeSettings, toast } = useUI();

  return (
    <>
      {selected && <DetailsModal movie={selected} onClose={closeDetails} />}
      {playing && <PlayerModal movie={playing} onClose={closePlayer} />}
      {settingsOpen && <SettingsModal onClose={closeSettings} />}
      <Toast message={toast} />
    </>
  );
}
