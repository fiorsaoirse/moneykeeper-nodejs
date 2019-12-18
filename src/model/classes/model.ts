class Model implements IModel {
    public id: number;
    public created: number;

    public constructor(id: number, created: number) {
        this.id = id;
        this.created = created;
    }
}