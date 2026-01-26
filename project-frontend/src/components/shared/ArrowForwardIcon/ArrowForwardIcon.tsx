import React from 'react';
import ArrowForwardIconMui from '@mui/icons-material/ArrowForward';
import './ArrowForwardIcon.scss';

interface ArrowForwardIconProps {
    onClick?: () => void;
}

const ArrowForwardIcon: React.FC<ArrowForwardIconProps> = ({ onClick }) => {
    return (
        <div className="back_home" onClick={onClick}>
            <ArrowForwardIconMui />
        </div>
    );
};

export default ArrowForwardIcon;
