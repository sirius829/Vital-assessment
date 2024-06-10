'use client';
import React, { useState, FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableListItem from './DraggableListItem';
import CustomDragLayer from './CustomDragLayer';
import { ItemType } from '@/utils/seedList';
import getList from '@/services/generateList';


const DraggableList: FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [items, setItems] = useState<ItemType[]>(getList());
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const handleMove = (dragIndex: number, hoverIndex: number) => {
        if (dragIndex === undefined || hoverIndex === undefined) return;
        const updatedItems = [...items];
        const draggedItem = updatedItems.splice(dragIndex, 1)[0];
        updatedItems.splice(hoverIndex, 0, draggedItem);
        setItems(updatedItems);
    };
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <DndProvider backend={HTML5Backend}>
            {isClient && items.map((item, index) => (
                <DraggableListItem
                    key={item.id}
                    index={index}
                    item={item}
                    onMove={handleMove}
                    setHoveredIndex={setHoveredIndex}
                    isHovered={hoveredIndex === index}
                />
            ))}
            <CustomDragLayer />
        </DndProvider>
    );
};

export default DraggableList;
