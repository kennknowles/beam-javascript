interface Class<T> {
    new(...args: any[]): T;
}

class CoderRegistry {
    internal_registry = {};
    get(urn: string): Coder {
        const constructor: Class<Coder> = this.internal_registry[urn];
        if (constructor === undefined) {
            return null!;
        }
        return new constructor();
    }

    register(urn: string, coderClass: Class<Coder>) {
        this.internal_registry[urn] = coderClass;
    }
}

export const CODER_REGISTRY = new CoderRegistry();


export class Coder {
    encode(element: any): Uint8Array {
        throw new Error('Not implemented!');
    }

    decode(bytes: Uint8Array): any {
        throw new Error('Not implemented!');
    }
}

export class BytesCoder extends Coder {
    static URN: string = "beam:coder:bytes:v1";
    constructor() {
        super();
    }

    encode(element: Uint8Array): Uint8Array {
        return element;
    }

    decode(element: Uint8Array): Uint8Array {
        return element;
    }
}
CODER_REGISTRY.register(BytesCoder.URN, BytesCoder);