import { faker } from "@faker-js/faker";

export type ItemType = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const generateItems = (count: number): ItemType[] => {
    const items: ItemType[] = [];
    for (let i = 0; i < count; i++) {
        items.push({
            id: i,
            title: faker.word.noun(),
            description: faker.lorem.sentence(),
            imageUrl: `https://picsum.photos/150?random=${i + 1}`,
        });
    }
    return items;
}

export default generateItems;