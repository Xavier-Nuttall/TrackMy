function Title({onToggle, isMenuOpen}) {
    return (
        <div id="title">
            <div id="menu" onClick={onToggle}>
                <div id="menu-button" className={`menu-button ${isMenuOpen ? 'change' : ''}`} >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
            <h1>TrackMy</h1>
        </div>
    )
}

export default Title;