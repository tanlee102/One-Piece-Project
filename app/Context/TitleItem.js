export const TitleItem = ({ id, label, state, setState }) => (
    <div 
        onClick={() => setState(id)} 
        style={{ borderBottom: state === id ? '2.5px solid cornflowerblue' : 'none' }} 
        className="common-title-style"
    >
        {label}
    </div>
);