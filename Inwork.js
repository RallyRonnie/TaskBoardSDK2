		this.sstory = '';
		var storyfilter = null;



		this.storypicker = this.add({
			xtype: 'rallycombobox',
			fieldLabel: 'Filter on Story:',
			displayField: 'FormattedID',
			project: '/project/__PROJECT_OID__',
			multiSelect: true,
			forceSelection: true,
			storeConfig: {
				model: 'UserStory',
				autoLoad: true,
				filters: [
					itfilter
				]
			},
			listeners:{
				single: true,
				change: function(combobox){
					timeboxScope = this.getContext().getTimeboxScope();
					if(timeboxScope) {
						itfilter = timeboxScope.getQueryFilter();
					}
					this.sstory = combobox.getRecord().get('FormattedID');
					console.log('Selected Story: '+this.sstory);
					if (this.sstory === '') {
						storyfilter =  null;
						newfilter = itfilter;
					} else {
						storyfilter = Ext.create('Rally.data.QueryFilter', {
							property: 'FormattedID',
							operator: '=',
							value: this.sstory
						});
						newfilter = itfilter.and(storyfilter);
					}
					this.userpicker.reset();
					this.taskboard.refresh({
						storeConfig: {
							filters: [
								newfilter
							]
						}
					});
				},
				scope: this
			}
		});


					this.storypicker.reset();
