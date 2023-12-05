// ColorSwatch.js
import React from 'react';
import './ColorsStyles.css';

function ColorSwatch({ colors, onColorSelect }) {
    return (
        <div className="color-swatches">
            {colors.map(color => (
                <button
                    key={color.name}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onColorSelect(color.name)}
                    title={color.name}
                    className="color-swatch"
                />
            ))}
        </div>
    );
}

export default ColorSwatch;
