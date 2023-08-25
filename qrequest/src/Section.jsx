
import testicon from './assets/react.svg';

export default function Section(props) {
    const { section } = props;
    return (
        <div
        key={section.id}
        id={`section-${section.id}`}
        className={`section ${props.activeSection === section.id ? 'selected' : ''}`}
        >
        <h2>{section.title}</h2>
        <p>{section.content}</p>
    
        <div className="section-columns">
            <div className="left">
            <img src={testicon} alt="testicon" />
            </div>
            <div className="right"> 
            {section.items.map(item => (
                <div className="item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
    }