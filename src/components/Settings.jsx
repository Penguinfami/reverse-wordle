const Settings = (props) => {


  return (
    <div style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3E3E3E' : 'white'}} 
        className="settings py-5 d-flex flex-column align-items-center">
        <h1>Settings</h1>
        <div className="settingsOption">
            <div className="d-flex mt-3 align-items-baseline">
                {props.darkMode
                    ? <input checked onChange={() => props.toggleDarkMode(!props.darkMode)} className="mx-2" type="checkbox" name="themeToggle"></input>
                    : <input onChange={() => props.toggleDarkMode(!props.darkMode)} className="mx-2" type="checkbox" name="themeToggle"></input>

                }
                <h5>Dark Mode</h5>
            </div>
        </div>
    </div>
  );
};

export default Settings;
