import Profile from '../../assets/new_profile.png';

const AssistantAvatar = () => {
  return (
    <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 overflow-hidden shadow-md shadow-cyan-500/10 flex-shrink-0">
      <img
        src={Profile}
        alt="Krunal's AI Assistant"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
    </div>
  );
};

export default AssistantAvatar;
