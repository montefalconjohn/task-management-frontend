export type Task = {
    id: string;
    attributes: {
        name: string,
        createdBy: any
    };
    relationships: {
        statuses: {
            id: string,
            attributes: {
                statusName: string
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