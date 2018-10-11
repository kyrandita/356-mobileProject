import React, { Component } from 'react';
import './Settings.css';

class Settings extends React.Component {
    render() {
        const showHideClassName = this.props.show ? "settings display-block" : "settings display-none";

        return (
            <div className={showHideClassName}>
                <section className="settings-main">
                    <p>Change username</p>
                    <input type="text" value={this.props.tempName} onChange={this.props.onChange()} />
                    <button onClick={this.props.onChangeUsername()}>Submit</button>
                    <button onClick={this.props.onToggleSettings()}>Exit</button>
                </section>
            </div>
        );
    }
}

export default Settings;