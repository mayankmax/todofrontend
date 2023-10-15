import React, { useState, useEffect } from 'react';

function WebsiteBlocker() {
  const [blockedWebsites, setBlockedWebsites] = useState([]);
  const [isBlockingEnabled, setIsBlockingEnabled] = useState(false);

  useEffect(() => {
    const storedBlockedWebsites = JSON.parse(localStorage.getItem('blockedWebsites'));
    const storedIsBlockingEnabled = JSON.parse(localStorage.getItem('isBlockingEnabled'));

    if (storedBlockedWebsites) {
      setBlockedWebsites(storedBlockedWebsites);
    }

    if (storedIsBlockingEnabled !== null) {
      setIsBlockingEnabled(storedIsBlockingEnabled);
    }
  }, []);

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setBlockedWebsites(value.split('\n'));
    localStorage.setItem('blockedWebsites', JSON.stringify(value.split('\n')));
  };

  const handleToggleBlocking = () => {
    setIsBlockingEnabled(!isBlockingEnabled);
    localStorage.setItem('isBlockingEnabled', JSON.stringify(!isBlockingEnabled));
  };

  return (
    <div>
      <h2>Website Blocker</h2>
      <div>
        <label>
          List of Websites to Block (Separate with new lines):
          <textarea
            value={blockedWebsites.join('\n')}
            onChange={handleWebsiteChange}
            rows="5"
            cols="30"
          />
        </label>
      </div>
      <div>
        <label>
          Enable Website Blocking:
          <input
            type="checkbox"
            checked={isBlockingEnabled}
            onChange={handleToggleBlocking}
          />
        </label>
      </div>
    </div>
  );
}

export default WebsiteBlocker;
