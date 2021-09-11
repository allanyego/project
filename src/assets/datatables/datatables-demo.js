// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable-user').DataTable({
    dom: 'Blfrtip',
    buttons: [
       {
           extend: 'pdf',
           footer: false,
           title: 'Users',
           exportOptions: {
                columns: [0,1,2,3,4,5]
            }
       },
       {
           extend: 'csv',
           footer: false,
           title: 'Users',
           exportOptions: {
                columns: [0,1,2,3,4,5]
            }

       },
       {
           extend: 'excel',
           footer: false,
           title: 'Users',
           exportOptions: {
                columns: [0,1,2,3,4,5]
            }
       },
       {
           extend: 'copy',
           footer: false,
           exportOptions: {
                columns: [0,1,2,3,4,5]
            }

       }
    ]
  });
  $('#dataTable').DataTable();
});
