import generateItems from "@/utils/seedList";

export default function getList() {
    if (typeof window !== 'undefined') {
        const list = localStorage.getItem('list');
        if (list) {
            return JSON.parse(list);
        } else {
            const generatedList = generateItems(5);
            localStorage.setItem('list', JSON.stringify(generatedList));
            return generatedList;
        }
    } else {
        // Handle server-side rendering here
        // You can return a default list or fetch data from an API
        return [];
    }
}