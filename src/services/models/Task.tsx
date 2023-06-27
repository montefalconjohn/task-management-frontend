export type Task = {
    id: string;
    attributes: {
        name: string
    };
    relationships: {
        statuses: {
            id: string,
            attributes: {
                statusName: string,
                createdBy: string
            }
        }
    };
}

const taskDefaultValue = () => {
    return {
        id: "",
        attributes: {
            name: ""
        },
        relationships: {
            statuses: {
                id: "",
                attributes: {
                    statusName: ""
                }
            }
        }
    }
};

export default taskDefaultValue;