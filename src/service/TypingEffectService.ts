class TypingEffectServiceClass {
  private typing: boolean = false;
  private subs: Set<() => void> = new Set();

  private notify = () => {
    this.subs.forEach(sub => sub?.());
  };

  setTyping = (typing: boolean) => {
    if (this.typing === typing) return;
    this.typing = typing;
    this.notify();
  };

  onChange = (cb: () => void): (() => void) => {
    this.subs.add(cb);
    return () => {
      this.subs.delete(cb);
    };
  };

  getTyping = (): boolean => {
    return this.typing;
  };
}

const TypingEffectService = new TypingEffectServiceClass()
export default TypingEffectService;
