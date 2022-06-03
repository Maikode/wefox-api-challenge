const sum = (a: number, b: number) => {
    return a + b;
};

describe('Test inicial funcion SUM', () => {
    it('primera prueba  2 + 3', () => {
        expect(sum(2, 3)).toBe(5);
    });
});
