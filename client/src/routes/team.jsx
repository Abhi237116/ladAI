import './Team.css';

function Team() {
    return (
        <div className="team-container">
            <h1 className="main-heading">LAD AI</h1>
            <div className="team-section">
                <div className="team-member">
                    <div className="profile-circle"></div>
                    <div className="info-box">
                        <h2>K Abhiram</h2>
                        <p>Body text for whatever you&apos;d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
                    </div>
                </div>
                <div className="connector" />

                <div className="team-member">
                    <div className="profile-circle"></div>
                    <div className="info-box">
                        <h2>Lalithadithya N</h2>
                        <p>Body text for whatever you&apos;d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
                    </div>
                </div>
                <div className="connector"></div>

                <div className="team-member">
                    <div className="profile-circle"></div>
                    <div className="info-box">
                        <h2>Dimpu Kumar</h2>
                        <p>Body text for whatever you&apos;d like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
