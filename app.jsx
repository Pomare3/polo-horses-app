const { useState } = React;

function PoloHorsesApp() {
  const [horses, setHorses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    weight: '',
    owner: '',
    poloGamesPlayed: '',
    lastVetCheck: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.breed || !formData.weight || !formData.owner) {
      alert('Please fill in all required fields');
      return;
    }

    const newHorse = {
      id: Date.now(),
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      poloGamesPlayed: parseInt(formData.poloGamesPlayed) || 0
    };

    setHorses(prev => [...prev, newHorse]);
    setFormData({
      name: '',
      age: '',
      breed: '',
      weight: '',
      owner: '',
      poloGamesPlayed: '',
      lastVetCheck: ''
    });
  };

  const handleDelete = (id) => {
    setHorses(prev => prev.filter(horse => horse.id !== id));
  };

  const calculateStats = () => {
    if (horses.length === 0) return null;
    
    const avgAge = (horses.reduce((sum, h) => sum + h.age, 0) / horses.length).toFixed(1);
    const avgWeight = (horses.reduce((sum, h) => sum + h.weight, 0) / horses.length).toFixed(1);
    const totalGames = horses.reduce((sum, h) => sum + h.poloGamesPlayed, 0);
    const avgGames = (totalGames / horses.length).toFixed(1);

    return { avgAge, avgWeight, totalGames, avgGames };
  };

  const stats = calculateStats();

  return (
    <div className="container">
      <header className="header">
        <h1>🐴 Polo Horses Management System</h1>
        <p className="subtitle">Professional equine data collection and analysis</p>
      </header>

      <main className="main-content">
        {/* Form Section */}
        <section className="form-section">
          <h2>Add New Polo Horse</h2>
          <form onSubmit={handleSubmit} className="horse-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Horse Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Thunder Storm"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age (years) *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="50"
                  placeholder="e.g., 7"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="breed">Breed *</label>
                <select
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Breed</option>
                  <option value="Argentinian Criollo">Argentinian Criollo</option>
                  <option value="Thoroughbred">Thoroughbred</option>
                  <option value="Quarter Horse">Quarter Horse</option>
                  <option value="Arab">Arab</option>
                  <option value="Cross">Cross</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="200"
                  max="800"
                  placeholder="e.g., 450"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="owner">Owner *</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  placeholder="e.g., Juan Martínez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="poloGamesPlayed">Polo Games Played</label>
                <input
                  type="number"
                  id="poloGamesPlayed"
                  name="poloGamesPlayed"
                  value={formData.poloGamesPlayed}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 25"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="lastVetCheck">Last General Vet Check</label>
                <input
                  type="date"
                  id="lastVetCheck"
                  name="lastVetCheck"
                  value={formData.lastVetCheck}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Add Horse</button>
          </form>
        </section>

        {/* Statistics Section */}
        {stats && (
          <section className="stats-section">
            <h2>Fleet Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Total Horses</span>
                <span className="stat-value">{horses.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Average Age</span>
                <span className="stat-value">{stats.avgAge} years</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Average Weight</span>
                <span className="stat-value">{stats.avgWeight} kg</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Polo Games</span>
                <span className="stat-value">{stats.totalGames}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Avg Games/Horse</span>
                <span className="stat-value">{stats.avgGames}</span>
              </div>
            </div>
          </section>
        )}

        {/* Summary Prose Section */}
        {horses.length > 0 && (
          <section className="summary-section">
            <h2>Fleet Summary</h2>
            <div className="prose-summary">
              <p>
                The polo horse fleet currently consists of <strong>{horses.length}</strong> magnificent equine athlete{horses.length !== 1 ? 's' : ''}. 
                The average horse in the fleet is <strong>{stats.avgAge} years old</strong> and weighs approximately <strong>{stats.avgWeight} kg</strong>, 
                indicating a well-maintained and athletically-built team. Collectively, these horses have participated in <strong>{stats.totalGames} polo games</strong>, 
                averaging <strong>{stats.avgGames} games per horse</strong>, demonstrating substantial competitive experience.
              </p>
              <p>
                The fleet represents diverse breeding backgrounds including {getBreedSummary(horses)}. 
                The team is managed by {getOwnerSummary(horses)}.
              </p>
              {getRecentVetCheckSummary(horses) && (
                <p>
                  {getRecentVetCheckSummary(horses)}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Table Section */}
        {horses.length > 0 && (
          <section className="table-section">
            <h2>Detailed Horse Registry</h2>
            <div className="table-wrapper">
              <table className="horses-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Breed</th>
                    <th>Weight (kg)</th>
                    <th>Owner</th>
                    <th>Polo Games</th>
                    <th>Last Vet Check</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {horses.map(horse => (
                    <tr key={horse.id}>
                      <td className="horse-name">{horse.name}</td>
                      <td>{horse.age}</td>
                      <td>{horse.breed}</td>
                      <td>{horse.weight}</td>
                      <td>{horse.owner}</td>
                      <td className="games-cell">{horse.poloGamesPlayed}</td>
                      <td className="date-cell">
                        {horse.lastVetCheck ? new Date(horse.lastVetCheck).toLocaleDateString() : 'Not recorded'}
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(horse.id)}
                          title="Delete horse record"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Empty State */}
        {horses.length === 0 && (
          <section className="empty-state">
            <p>📊 No horses added yet. Add your first polo horse using the form above!</p>
          </section>
        )}
      </main>
    </div>
  );
}

// Helper functions
function getBreedSummary(horses) {
  const breeds = {};
  horses.forEach(h => {
    breeds[h.breed] = (breeds[h.breed] || 0) + 1;
  });
  return Object.entries(breeds)
    .map(([breed, count]) => `${count} ${breed}`)
    .join(', ');
}

function getOwnerSummary(horses) {
  const owners = new Set(horses.map(h => h.owner));
  return Array.from(owners).join(' and ');
}

function getRecentVetCheckSummary(horses) {
  const recentChecks = horses.filter(h => h.lastVetCheck);
  if (recentChecks.length === 0) return null;
  
  const mostRecent = recentChecks.reduce((prev, curr) => 
    new Date(curr.lastVetCheck) > new Date(prev.lastVetCheck) ? curr : prev
  );
  
  return `The most recent veterinary examination was performed on ${new Date(mostRecent.lastVetCheck).toLocaleDateString()} for ${mostRecent.name}.`;
}

// Render the app
ReactDOM.render(<PoloHorsesApp />, document.getElementById('root'));
