import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] =
    useState(true);

  const [emailReports, setEmailReports] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <div>
          <h2>Settings</h2>
          <p>
            Manage your dashboard preferences
          </p>
        </div>

        {saved && (
          <span className="saved-message">
            Settings saved successfully
          </span>
        )}
      </div>

      <div className="settings-grid">
        <section className="panel settings-panel">
          <h3>Profile Settings</h3>
          <p className="settings-description">
            Update your personal information.
          </p>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                defaultValue="Admin"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                defaultValue="User"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                defaultValue="admin@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                defaultValue="+91 98765 43210"
              />
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </section>

        <section className="panel settings-panel">
          <h3>Appearance</h3>

          <p className="settings-description">
            Customize how the dashboard looks.
          </p>

          <div className="setting-row">
            <div>
              <strong>Dark Mode</strong>
              <p>
                Use dark colors throughout the
                application.
              </p>
            </div>

            <button
              className={`toggle ${
                theme === "dark"
                  ? "toggle-active"
                  : ""
              }`}
              onClick={toggleTheme}
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="panel settings-panel">
          <h3>Notifications</h3>

          <p className="settings-description">
            Manage notification preferences.
          </p>

          <div className="setting-row">
            <div>
              <strong>
                Push Notifications
              </strong>

              <p>
                Receive notifications about new
                orders.
              </p>
            </div>

            <button
              className={`toggle ${
                notifications
                  ? "toggle-active"
                  : ""
              }`}
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Email Reports</strong>

              <p>
                Receive weekly analytics reports.
              </p>
            </div>

            <button
              className={`toggle ${
                emailReports
                  ? "toggle-active"
                  : ""
              }`}
              onClick={() =>
                setEmailReports(
                  !emailReports
                )
              }
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="panel settings-panel">
          <h3>Security</h3>

          <p className="settings-description">
            Manage your account security.
          </p>

          <button className="secondary-btn full-btn">
            Change Password
          </button>

          <button className="secondary-btn full-btn">
            Enable Two-Factor Authentication
          </button>
        </section>
      </div>
    </div>
  );
}