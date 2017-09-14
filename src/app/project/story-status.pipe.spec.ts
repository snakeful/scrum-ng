import { StoryStatusPipe } from './story-status.pipe';

describe('StoryStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StoryStatusPipe(null);
    expect(pipe).toBeTruthy();
  });
});
