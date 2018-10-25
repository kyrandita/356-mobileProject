import React, { Component } from 'react';
import './Settings.css';

class Settings extends React.Component {

    updateName = () => {
        this.props.onChangeUsername();

        alert(`Username changed to: ${this.props.tempName}`);
    };

    render() {
        const showHideClassName = this.props.show ? "settings display-block" : "settings display-none";

        return (
            <div className={showHideClassName}>
                <section className="settings-main">
                    <label>Change username: </label>
                    <input type="text" value={this.props.tempName} onChange={this.props.onChange()} />
                    <button disabled={this.props.tempName === this.props.name} onClick={this.updateName}>Update</button>
                    <button id="exit" onClick={this.props.onToggleSettings()}>X</button>
                    {/*<img src={require("./gray-x-icon.png")} id='gray-x-icon' />-->*/}

                    <br />
                    <br />

                    <label>Change theme: </label>
                    <select className="theme-select" value={this.props.theme} onChange={this.props.onChange2()}>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </section>
            </div>
        );
    }
}

export default Settings;