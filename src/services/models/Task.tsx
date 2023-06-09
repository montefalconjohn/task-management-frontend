type Task = {
    id: string;
    attributes: {
        name: string
    };
    relationships: {
        statuses: {
            attributes: {
                statusName: string
            }
        }
    };
}