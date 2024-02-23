export class TestAccessor {
    // >es2022
    private accessor name: string;

    private _id: number;
    public get id() {
        return this._id;
    };

    #region: string;

    public age: number;
}

const a = new TestAccessor;