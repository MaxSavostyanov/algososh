describe('Сервер доступен по адресу:', function () {
	beforeEach(() => {
		cy.visit('');
	})

	it('localhost:3000/recursion', function () {
		cy.get('[href*="/recursion"]').click();
		cy.contains('Строка');
	});

	it('localhost:3000/fibonacci', function () {
		cy.get('[href*="/fibonacci"]').click();
		cy.contains('Последовательность Фибоначчи');
	});

	it('localhost:3000/sorting', function () {
		cy.get('[href*="/sorting"]').click();
		cy.contains('Сортировка массива');
	});

	it('localhost:3000/stack', function () {
		cy.get('[href*="/stack"]').click();
		cy.contains('Стек');
	});

	it('localhost:3000/queue', function () {
		cy.get('[href*="/queue"]').click();
		cy.contains('Очередь');
	});
	
	it('localhost:3000/list', function () {
		cy.get('[href*="/list"]').click();
		cy.contains('Связный список');
	});
}); 