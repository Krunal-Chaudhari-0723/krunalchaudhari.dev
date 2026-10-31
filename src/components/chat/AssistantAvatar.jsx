import Profile from '../../assets/new_profile.png';

// Profile photo inside a brand gradient ring
const AssistantAvatar = ({ size = "h-7 w-7" }) => {
  return (
    <div className={`${size} shrink-0 rounded-full bg-gradient-to-br from-brand-400 via-indigo-400 to-cyan-300 p-[1.5px]`}>
      <img
        src={Profile}
        alt="Krunal's AI Assistant"
        className="h-full w-full rounded-full border border-zinc-950 object-cover"
      />
    </div>
  );
};

export default AssistantAvatar;
