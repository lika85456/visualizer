'use babel';

import VisualizerView from './visualizer-view';
import { CompositeDisposable } from 'atom';

export default {

  visualizerView: null,
  visualizItem: null,
  subscriptions: null,

  activate(state) {
    this.visualizerView = new VisualizerView(state.visualizerState);
    this.visualizeItem = atom.workspace.getActivePane().addItem(this.visualizerView);
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'visualizer:visualize': () => this.visualizeItem.isVisible()?this.visualizeItem.hide():this.visualizeItem.show();
    }));

  },

  deactivate() {
    //this.modalPanel.destroy();
    //this.subscriptions.dispose();
    this.visualizerView.destroy();
  },


  open(){

  }

};
