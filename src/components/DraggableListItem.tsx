'use client';
import { ItemType } from '@/utils/seedList';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';


type DraggableListItemProps = {
    item: ItemType;
    index: number;
    onMove: (dragIndex: number, hoverIndex: number) => void;
    setHoveredIndex: (index: number | null) => void;
    isHovered: boolean;
};

const DraggableListItem: React.FC<DraggableListItemProps> = ({ item, index, onMove, setHoveredIndex, isHovered }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index && draggedItem.index + 1 !== index) {
                setHoveredIndex(index);
            } else {
                setHoveredIndex(null);
            }
        },
        drop: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index && draggedItem.index + 1 !== index) {
                onMove(draggedItem.index, index);
                draggedItem.index = index;
            }
            setHoveredIndex(null);
        },
    });

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: 'ITEM',
        item: { index, ...item },
        end: () => {
            setHoveredIndex(null);
        },
        collect: (monitor: DragSourceMonitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    });
    useEffect(() => {
        if (ref.current)
            drag(drop(ref));
    }, [ref, drag, drop]);
    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
    }, [dragPreview]);
    return (
        <div
            ref={ref}
            className='relative'
        >
            <div
                className={`p-4 flex flex-row gap-2 items-center text-slate-600 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            >
                <Image width={40} height={40} src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded" />
                <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
            {isHovered && !isDragging && (
                <div className="absolute inset-0 border-t-4 border-blue-500 pointer-events-none"></div>
            )}
        </div>
    );
};

export default DraggableListItem;
