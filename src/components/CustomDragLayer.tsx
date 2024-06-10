import Image from 'next/image';
import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '150px',
    height: '50px',

};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

const CustomDragLayer: React.FC = () => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging) {
        return null;
    }

    if (itemType !== 'ITEM') {
        return null;
    }


    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                <div className="p-4 flex flex-row gap-2 bg-white rounded shadow-lg items-center">
                    <Image width={30} height={30} src={item.imageUrl} alt={item.title} className="w-10 h-10 mb-1 rounded" />
                    <h3 className="font-bold text-sm text-slate-500">{item.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default CustomDragLayer;
