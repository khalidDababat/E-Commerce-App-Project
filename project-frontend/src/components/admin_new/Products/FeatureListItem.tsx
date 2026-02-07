import React from 'react';
import {
    ListItem,
    ListItemButton,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { Feature } from '../../../types';

interface FeatureListItemProps {
    feature: Feature;
    isSelected: boolean;
    onToggle: (id: number) => void;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({
    feature,
    isSelected,
    onToggle,
}) => {
    const labelId = `checkbox-list-label-${feature.id}`;
    return (
        <ListItem disablePadding>
            <ListItemButton dense onClick={() => onToggle(Number(feature.id))}>
                <Checkbox
                    edge="start"
                    checked={isSelected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText
                    id={labelId}
                    primary={feature.name}
                    sx={{ textAlign: 'right', paddingRight: '10px' }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default FeatureListItem;
