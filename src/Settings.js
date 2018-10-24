import React, { Component } from 'react';
import './Settings.css';

class Settings extends React.Component {
    render() {
        const showHideClassName = this.props.show ? "settings display-block" : "settings display-none";

        return (
            <div className={showHideClassName}>
                <section className="settings-main">
                    <label>Change username: </label>
                    <input type="text" value={this.props.tempName} onChange={this.props.onChange()} />
                    <button disabled={this.props.tempName === this.props.name} onClick={this.props.onChangeUsername()}>Update</button>
                    <button id="exit" onClick={this.props.onToggleSettings()}>Exit</button>

                    <br />
                    <br />

                    <select className="theme-select" value={this.props.theme} onChange={this.props.onChange2()}>
                        <option value="Theme 1">Theme 1</option>
                        <option value="Theme 2">Theme 2</option>
                    </select>
                    <button onClick={this.props.onChangeTheme()}>Update</button>
                </section>
            </div>
        );
    }
}

export default Settings;