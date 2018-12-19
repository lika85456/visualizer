'use babel';

import VisualizerView from './visualizer-view';
import { CompositeDisposable } from 'atom';

export default {

  visualizerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.visualizerView = new VisualizerView(state.visualizerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.visualizerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'visualizer:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.visualizerView.destroy();
  },

  serialize() {
    return {
      visualizerViewState: this.visualizerView.serialize()
    };
  },

  toggle() {
    console.log('Visualizer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
