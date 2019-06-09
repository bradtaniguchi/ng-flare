import { SearchParamAdapter } from './search-param-adapter';

describe('searchParamAdapter', () => {
  const adapter = new SearchParamAdapter<{ name: string; description: string }>(
    {
      defaultLimit: 5,
      defaultOrderBy: 'name'
    }
  );

  it('updateOrderBy', () =>
    expect(
      adapter.updateOrderBy('description', { limit: 5, orderBy: 'name' })
    ).toEqual({ limit: 5, orderBy: 'description' }));
  it('updateLimit', () =>
    expect(adapter.updateLimit(10, { limit: 5, orderBy: 'name' })).toEqual({
      limit: 10,
      orderBy: 'name'
    }));
  it('reset', () =>
    expect(
      adapter.reset(
        {
          limit: 10,
          orderBy: 'description',
          extra: true
        } as any,
        {
          limit: 5,
          orderBy: 'name'
        }
      )
    ).toEqual({ limit: 5, orderBy: 'name', extra: true } as any));
});
