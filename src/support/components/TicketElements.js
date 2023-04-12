export function getTicketElement(tickets) {
    const htmlElements = [];

    if (tickets.length > 0) {
        for (let i = 0; i < tickets.length; i++) {
            htmlElements.push(
                <tr className="ticket-container" key={i}>
                    <td className="ticket-type">
                        {tickets[i].type}
                    </td>
                    <td className="ticket-title">
                        {tickets[i].subject}
                    </td>
                    <td className="contact-email">
                        {tickets[i].contactEmail}
                    </td>
                    <td className="contact-number">
                        {tickets[i].contactNumber}
                    </td>
                    <td className="contact-description">
                        {tickets[i].description}
                    </td>
                    <td className="ticket-status">
                        {tickets[i].status}
                    </td>
                    <td className="ticket-created">
                        {tickets[i].createdAt.substring(0, 10)} {tickets[i].createdAt.substring(11, 16)}
                    </td>
                </tr>
            );
        }
    } else {
        htmlElements.push(
            <div className="ticket-container" key={0}>
                <div className="ticket-title">
                    <h5>No tickets found</h5>
                </div>
            </div>
        );
    }
    return htmlElements;
}